import 'package:coordenadas_app/drawer.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class Authentication extends StatefulWidget {
  @override
  State<Authentication> createState() => _AuthenticationState();
}

class _AuthenticationState extends State<Authentication> {
  final String _user = "user@mail.com";
  final String _pswd = "Temp0123*";
  String mensaje = "";

  void _crearUsuario() async {
    var msj = "Usuario creado!";

    try {
      await FirebaseAuth.instance
          .createUserWithEmailAndPassword(email: _user, password: _pswd);
    } on FirebaseAuthException catch (e) {
      if (e.code == 'weak-password') {
        msj = "La contraseña no cumple con los valores mínimos requeridos";
      } else if (e.code == 'email-already-in-use') {
        msj = "Usuario ya se encuentra creado!";
      }
    } catch (e) {
      msj = "Ocurrio un error: $e";
    }
    setState(() {
      mensaje = msj;
    });
  }

  void _autenticarUsuario() async {
    var msj = "Usuario Autenticado!";

    try {
      await FirebaseAuth.instance
          .signInWithEmailAndPassword(email: _user, password: _pswd);
    } on FirebaseAuthException catch (e) {
      if ((e.code == 'user-not-found') || (e.code == 'worng-password')) {
        msj = "Usuario/Contraseña errados";
      }
    } catch (e) {
      msj = "Ocurrio un error: $e";
    }
    setState(() {
      mensaje = msj;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: NavDrawer(),
      appBar: AppBar(
        title: Text("Autenticación"),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            const Text(
              'Estado de la usuario:',
            ),
            Text(
              mensaje,
              style: Theme.of(context).textTheme.headlineMedium,
            ),
          ],
        ),
      ),
      floatingActionButton: Column(
        crossAxisAlignment: CrossAxisAlignment.end,
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          /*FloatingActionButton(
            onPressed: _crearUsuario,
            tooltip: 'Crear Usuario',
            child: const Icon(Icons.supervised_user_circle),
          ),*/
          const SizedBox(
            height: 4,
          ),
          FloatingActionButton(
              onPressed: _autenticarUsuario,
              tooltip: 'Login Usuario',
              child: const Icon(Icons.login)),
        ],
      ),
    );
  }
}



/*
import 'package:coordenadas_app/drawer.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class Authentication extends StatefulWidget {
  @override
  State<Authentication> createState() => _AuthenticationState();
}

class _AuthenticationState extends State<Authentication> {
  final String _user = "user@mail.com";
  final String _pswd = "Temp0123*";
  String mensaje = "";

  void _crearUsuario() async {
    var msj = "Usuario creado!";

    try {
      await FirebaseAuth.instance
          .createUserWithEmailAndPassword(email: _user, password: _pswd);
    } on FirebaseAuthException catch (e) {
      if (e.code == 'weak-password') {
        msj = "La contraseña no cumple con los valores mínimos requeridos";
      } else if (e.code == 'email-already-in-use') {
        msj = "Usuario ya se encuentra creado!";
      }
    } catch (e) {
      msj = "Ocurrio un error: $e";
    }
    setState(() {
      mensaje = msj;
    });
  }

  void _autenticarUsuario() async {
    var msj = "Usuario Autenticado!";

    try {
      await FirebaseAuth.instance
          .signInWithEmailAndPassword(email: _user, password: _pswd);
    } on FirebaseAuthException catch (e) {
      if ((e.code == 'user-not-found') || (e.code == 'worng-password')) {
        msj = "Usuario/Contraseña errados";
      }
    } catch (e) {
      msj = "Ocurrio un error: $e";
    }
    setState(() {
      mensaje = msj;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: NavDrawer(),
      appBar: AppBar(
        title: Text("Autenticación"),
      ),
      body: Center(child: Text("Autenticación")),
      floatingActionButton: Column(
        crossAxisAlignment: CrossAxisAlignment.end,
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          FloatingActionButton(
            onPressed: _crearUsuario,
            tooltip: 'Crear Usuario',
            child: const Icon(Icons.supervised_user_circle),
          ),
          const SizedBox(
            height: 4,
          ),
          FloatingActionButton(
              onPressed: _autenticarUsuario,
              tooltip: 'Login Usuario',
              child: const Icon(Icons.login)),
        ],
      ),
    );
  }
}
*/
