import 'package:coordenadas_app/drawer.dart';
import 'package:flutter/material.dart';

class Sale extends StatefulWidget {
  @override
  State<Sale> createState() => _SaleState();
}

class _SaleState extends State<Sale> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: NavDrawer(),
      appBar: AppBar(
        title: Text("Estado Venta"),
      ),
      body: Center(child: Text("Estado Venta")),
    );
  }
}
