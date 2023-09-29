import 'package:flutter/material.dart';

class Complaints extends StatefulWidget {
  @override
  State<Complaints> createState() => _ComplaintsState();
}

class _ComplaintsState extends State<Complaints> {
  static const appTitle = 'PQRS';

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      //drawer: NavDrawer(title: appTitle),
      appBar: AppBar(
        title: Text("PQRS"),
      ),
      body: Center(child: Text("PQRS")),
    );
  }
}
