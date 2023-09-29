import 'package:coordenadas_app/drawer.dart';
import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_core/firebase_core.dart';

class Sale extends StatefulWidget {
  @override
  State<Sale> createState() => _SaleState();
}

class _SaleState extends State<Sale> {
  //final Stream<QuerySnapshot> _cityStream =
  //FirebaseFirestore.instance.collection('venta').snapshots();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: NavDrawer(),
      appBar: AppBar(
        title: Text("Estado Venta"),
      ),
      //body: Center(child: Text("Estado Venta")),
      body: StreamBuilder<QuerySnapshot>(
          //stream: _cityStream,
          stream: FirebaseFirestore.instance.collection('venta').snapshots(),
          //stream: FirebaseFirestore.instance.collection('venta').doc('UID').get(),

          builder:
              (BuildContext context, AsyncSnapshot<QuerySnapshot> snapshot) {
            if (snapshot.hasError) {
              return const Text('Something went wrong');
            }
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Text('Loading...');
            }
            return ListView(
              children: snapshot.data!.docs.map((DocumentSnapshot document) {
                final data = document.data()! as Map<String, dynamic>;
                return ListTile(leading: Text(data['estado'].toString()));
              }).toList(),
            );
          }),
    );
  }
}
