import 'package:lista_usuario/home_screen.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Lista de Usuarios',
      theme: ThemeData(primarySwatch: Colors.indigo),
      home: HomeScreen(),
    );
  }
}




/*
import 'package:flutter/material.dart';
import 'package:lista_usuario/home_screen.dart';

void main() => runApp(MyApp());

class MyApp extends StatefulWidget {
  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  List<Persona> _personas = [
    Persona("Jose", "Reyes", "300526878745"),
    Persona("Maria", "Acosta", "3015265987"),
    Persona("Pedro", "Arévalo", "31525687"),
  ];

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Lista de Usuarios',
      theme: ThemeData(primarySwatch: Colors.indigo),
      //home: HomeScreen(),
      home: Scaffold(
          appBar: AppBar(
            title: Text('Lista de Usuarios'),
          ),
          body: ListView.builder(
              itemCount: _personas.length,
              itemBuilder: (context, index) {
                return ListTile(
                  onLongPress: () {
                    this._borrarPersona(context, _personas[index]);
                  },
                  title: Text(
                      _personas[index].name + ' ' + _personas[index].lastname),
                  subtitle: Text(_personas[index].phone),
                  leading: CircleAvatar(
                    child: Text(_personas[index].name.substring(0, 1)),
                  ),
                  trailing: Icon(Icons.arrow_forward_ios),
                );
              })),
    );
  }

  _borrarPersona(context, Persona persona) {
    showDialog(
        context: context,
        builder: (_) => AlertDialog(
              title: Text("Eliminar Contacto"),
              content:
                  Text("¿Está seguro de eliminar a " + persona.name + ' ?'),
              actions: [
                TextButton(
                    onPressed: () {
                      Navigator.pop(context);
                    },
                    child: Text("Cancelar")),
                TextButton(
                    onPressed: () {
                      print(persona.name);
                      setState(() {
                        _personas.remove(persona);
                      });
                      Navigator.pop(context);
                    },
                    child: Text(
                      "Borrar",
                      style: TextStyle(color: Colors.red),
                    )),
              ],
            ));
  }
}

class Persona {
  String name;
  String lastname;
  String phone;

  Persona(this.name, this.lastname, this.phone);
}

*/

//https://www.youtube.com/watch?v=jnkItI-0Fn0

//https://www.youtube.com/watch?v=uhnPQUDbfoo&list=RDCMUCBK9q6sNfGQAp3QCuHz5rRg&index=3

//https://www.youtube.com/watch?v=osUq6B92-BY
