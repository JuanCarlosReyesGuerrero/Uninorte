import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:coordenadas_app/drawer.dart';
import 'package:flutter/material.dart';

class RedStatus extends StatefulWidget {
  @override
  State<RedStatus> createState() => _RedStatusState();
}

class _RedStatusState extends State<RedStatus> {
  String mensaje = "";
  String _estado = "";

  void _verificarEstadoRed() async {
    var resultado = await (Connectivity().checkConnectivity());
    setState(() {
      if (resultado == ConnectivityResult.mobile) {
        _estado = "Red Móvil";
      } else if (resultado == ConnectivityResult.wifi) {
        _estado = "Red Wifi";
      } else {
        _estado = "Sin Red";
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: NavDrawer(),
      appBar: AppBar(
        title: Text("Estado de la red"),
      ),
      //body: Center(child: Text("Estado de la red")),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text('Estado de la red'),
            Text(
              _estado,
              style: Theme.of(context).textTheme.headlineMedium,
              //mensaje,
              //style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _verificarEstadoRed,
        tooltip: 'Estado de Red',
        child: const Icon(Icons.network_check),
      ),
    );
  }
}
