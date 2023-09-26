import 'dart:math';

import 'package:flutter/material.dart';
import 'package:connectivity_plus/connectivity_plus.dart';
import 'package:flutter_local_notifications/flutter_local_notifications.dart';
import 'package:firebase_core/firebase_core.dart';
import 'package:firebase_auth/firebase_auth.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  await Firebase.initializeApp();
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Flutter Demo',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.indigo),
        useMaterial3: true,
      ),
      home: const MyHomePage(title: 'Estado de Red y Notificaciones'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  //const MyHomePage({super.key, required this.title});
  const MyHomePage({Key? key, required this.title}) : super(key: key);

  final String title;

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  String _estado = "";

  final String _user = "user@mail.com";
  final String _pswd = "Temp0123*";
  String mensaje = "";

  //Declarar clase notificadora
  late FlutterLocalNotificationsPlugin _fnp;

//Sobreescribir un método de la clase State
  @override
  void initState() {
    //Invocar la funcionalidad normal
    super.initState();

    //Lógica complementaria
    var ais = const AndroidInitializationSettings('bell_notification');
    var iss = InitializationSettings(android: ais);
    _fnp = FlutterLocalNotificationsPlugin();
    _fnp.initialize(iss);
  }

  Future onSelectNotification(String? payload) async {
    showDialog(
      context: context,
      builder: (_) => AlertDialog(
        title: const Text(
          "Notification",
        ),
        content: Text(payload!),
      ),
    );
  }

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
        drawer: Drawer(
          child: Container(
            color: Colors.white,
            child: Column(
              children: [
                Container(
                  width: 100,
                  height: 100,
                  margin: const EdgeInsets.only(top: 50, bottom: 20),
                  child: Image.network(
                      "https://st3.depositphotos.com/29384342/50528/v/450/depositphotos_505289992-stock-illustration-empty-shopping-cart-flat-color.jpg"),
                ),
                const Text(
                  "Juan Reyes",
                  style: TextStyle(fontWeight: FontWeight.bold, fontSize: 20),
                ),
                Container(
                  margin: const EdgeInsets.only(top: 30),
                  padding: const EdgeInsets.all(20),
                  width: double.infinity,
                  color: Colors.grey[100],
                  child: const Text("Home"),
                ),
                Container(
                  margin: const EdgeInsets.only(top: 2),
                  padding: const EdgeInsets.all(20),
                  width: double.infinity,
                  color: Colors.grey[100],
                  child: const Text("Productos"),
                ),
                Container(
                  margin: const EdgeInsets.only(top: 2),
                  padding: const EdgeInsets.all(20),
                  width: double.infinity,
                  color: Colors.grey[100],
                  child: const Text("Ventas"),
                ),
                Container(
                  margin: const EdgeInsets.only(top: 2),
                  padding: const EdgeInsets.all(20),
                  width: double.infinity,
                  color: Colors.grey[100],
                  child: const Text("Chat"),
                ),
                Container(
                  margin: const EdgeInsets.only(top: 2),
                  padding: const EdgeInsets.all(20),
                  width: double.infinity,
                  color: Colors.grey[100],
                  child: const Text("PQRS"),
                ),
                Expanded(child: Container()),
                Container(
                  margin: const EdgeInsets.only(top: 2),
                  padding: const EdgeInsets.all(20),
                  width: double.infinity,
                  color: Colors.black87,
                  alignment: Alignment.center,
                  child: const Text(
                    "Sign out",
                    style: TextStyle(
                        color: Colors.white, fontWeight: FontWeight.bold),
                  ),
                ),
              ],
            ),
          ),
        ),
        appBar: AppBar(
          //backgroundColor: Theme.of(context).colorScheme.inversePrimary,
          backgroundColor: Colors.green,
          title: Text(widget.title),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              const Text(
                'Estado de la Red:',
              ),
              Text(
                //_estado,
                //style: Theme.of(context).textTheme.headlineMedium,
                mensaje,
                style: Theme.of(context).textTheme.headlineMedium,
              ),
            ],
          ),
        ),
        //floatingActionButton: FloatingActionButton(
        //  onPressed: _verificarEstadoRed,
        //  tooltip: 'Estado de Red',
        //  child: const Icon(Icons.network_check),
        //),
        //floatingActionButton: FloatingActionButton(
        // onPressed: showNotification,
        // tooltip: 'Notify',
        // child: const Icon(Icons.message_rounded),
        //),
        floatingActionButton: Column(
          crossAxisAlignment: CrossAxisAlignment.end,
          mainAxisAlignment: MainAxisAlignment.end,
          children: [
            FloatingActionButton(
              onPressed: _crearUsuario,
              tooltip: 'Crear Usuario',
              child: const Icon(Icons.supervised_user_circle),
            ), //
            const SizedBox(
              height: 4,
            ),
            FloatingActionButton(
              onPressed: _autenticarUsuario,
              tooltip: 'Login Usuario',
              child: const Icon(Icons.login),
            ),
          ],
        ));
  }

  Future showNotification() async {
    //crear detalles para android
    var ands = const AndroidNotificationDetails("channel-Id-1", "channel-name",
        channelDescription: "Test Class",
        playSound: false,
        importance: Importance.high,
        priority: Priority.max);

    //Unificar configuraciones de detalle
    var nd = NotificationDetails(android: ands);

    //Mostrar la notificación
    _fnp.show(
        Random().nextInt(16), "Notification Ejemplo", "Mensaje de Ejemplo!", nd,
        payload: "Mensaje de Ejemplo!");
  }
}
