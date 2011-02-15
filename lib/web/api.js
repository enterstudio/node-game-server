function handle(server, gs){
	// API
	server.post('/api/:method.:format', function(req, res){
	
		var format = '';
		switch(req.param('format')){
			case 'json':
				res.contentType('application/json');
				format = 'json';
				break;
			default:
				res.send('Invalid response format: '+req.param('format'), 400);
				return;
		}
	
		switch(req.param('method')){
			case 'create_player':
				var name = req.body.name;
				var onTick = req.body.onTick;
				
				gs.players_add({name: name, onTick: onTick}, function(ret){
					res.send(JSON.stringify(ret));
				});
				break;
		
			case 'edit_player':
				var id = req.body.id;
				var name = req.body.name;
				var onTick = req.body.onTick;
				
				gs.players_get(id, function(player){
					player.name = name;
					player.onTick = onTick;
					
					gs.players_edit(id, player, function(ret){
						res.send(JSON.stringify(ret));
					});
				});
				break;
			
			case 'delete_player':
				var id = req.body.id;

				gs.players_delete(id, function(ret){
					res.send(JSON.stringify(ret));
				});
				break;
			default:	
				res.send(JSON.stringify({ok: false, error: 'Invalid method: '+req.param('method')}), 400);
				return;
		}
	});
};

exports.handle = handle;