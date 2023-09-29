import 'package:coordenadas_app/screens/authentication.dart';
import 'package:coordenadas_app/screens/chat.dart';
import 'package:coordenadas_app/screens/products.dart';
import 'package:coordenadas_app/screens/red-status.dart';
import 'package:coordenadas_app/screens/sale.dart';
import 'package:flutter/material.dart';
import 'package:coordenadas_app/screens/home.dart';
import 'package:coordenadas_app/screens/about.dart';

class NavDrawer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: MediaQuery.of(context).size.width * 0.50,
      child: Drawer(
        child: Container(
          color: Colors.white,
          child: ListView(
            children: <Widget>[
              const DrawerHeader(
                decoration: BoxDecoration(
                  color: Colors.green,
                ),
                child: Text('Tienda Quinde',
                    style: TextStyle(
                        fontWeight: FontWeight.bold,
                        fontSize: 20,
                        color: Colors.white)),
              ),
              ListTile(
                title: Text('Home'),
                textColor: Colors.green,
                trailing: Icon(
                  Icons.home,
                  color: Colors.green,
                ),
                onTap: () => Navigator.of(context).push(MaterialPageRoute(
                    builder: (context) => HomeScreen(title: "Home"))),
              ),
              ListTile(
                title: Text('Autenticación'),
                textColor: Colors.green,
                trailing: Icon(
                  Icons.verified_user_sharp,
                  color: Colors.green,
                ),
                onTap: () => Navigator.of(context).push(
                    MaterialPageRoute(builder: (context) => Authentication())),
              ),
              ListTile(
                title: Text('Productos'),
                textColor: Colors.green,
                trailing: Icon(
                  Icons.add_business,
                  color: Colors.green,
                ),
                onTap: () => Navigator.of(context)
                    .push(MaterialPageRoute(builder: (context) => Product())),
              ),
              ListTile(
                title: Text('Ventas'),
                textColor: Colors.green,
                trailing: Icon(
                  Icons.add_shopping_cart,
                  color: Colors.green,
                ),
                onTap: () => Navigator.of(context)
                    .push(MaterialPageRoute(builder: (context) => Sale())),
              ),
              ListTile(
                title: Text('Estado Red'),
                textColor: Colors.green,
                trailing: Icon(
                  Icons.network_check,
                  color: Colors.green,
                ),
                onTap: () => Navigator.of(context)
                    .push(MaterialPageRoute(builder: (context) => RedStatus())),
              ),
              ListTile(
                title: Text('Chat'),
                textColor: Colors.green,
                trailing: Icon(
                  Icons.wechat,
                  color: Colors.green,
                ),
                onTap: () => Navigator.of(context)
                    .push(MaterialPageRoute(builder: (context) => ChatPage())),
              ),
              ListTile(
                title: Text('About'),
                textColor: Colors.green,
                trailing: Icon(
                  Icons.info_rounded,
                  color: Colors.green,
                ),
                onTap: () => Navigator.of(context)
                    .push(MaterialPageRoute(builder: (context) => About())),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
