import 'package:coordenadas_app/drawer.dart';
import 'package:flutter/material.dart';

class Product extends StatefulWidget {
  @override
  State<Product> createState() => _ProductState();
}

class _ProductState extends State<Product> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: NavDrawer(),
      appBar: AppBar(
        title: Text("Productos"),
      ),
      body: Center(child: Text("Productos")),
    );
  }
}
