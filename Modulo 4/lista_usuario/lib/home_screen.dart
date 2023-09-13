import 'package:flutter/material.dart';
import 'package:lista_usuario/db_helper.dart';

class HomeScreen extends StatefulWidget {
  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  List<Map<String, dynamic>> _allData = [];

  bool _isLoading = true;

//Get All Data From Database
  void _refreshData() async {
    final data = await SQLHelper.getAllData();
    setState(() {
      _allData = data;
      _isLoading = false;
    });
  }

  @override
  void initState() {
    super.initState();
    _refreshData();
  }

//Add Data
  Future<void> _addData() async {
    await SQLHelper.createData(_nameController.text, _cityController.text);
    _refreshData();
  }

//Updatet Data
  Future<void> _updateData(int id) async {
    await SQLHelper.updateData(id, _nameController.text, _cityController.text);
    _refreshData();
  }

//Delete Data
  void _deleteData(int id) async {
    await SQLHelper.deleteData(id);
    ScaffoldMessenger.of(context).showSnackBar(const SnackBar(
      backgroundColor: Colors.redAccent,
      content: Text("Registro Eliminado"),
    ));
    _refreshData();
  }

  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _cityController = TextEditingController();

  void showBottomSheet(int? id) async {
    // si la id no es nula, se actualizará; de lo contrario, se generarán nuevos datos
    // cuando se presiona el ícono de edición, se le dará al id a la función del boton inferior y
    // editará
    if (id != null) {
      final existingData =
          _allData.firstWhere((element) => element['id'] == id);
      _nameController.text = existingData['name'];
      _cityController.text = existingData['city'];
    }

    showModalBottomSheet(
      elevation: 5,
      isScrollControlled: true,
      context: context,
      builder: (_) => Container(
        padding: EdgeInsets.only(
          top: 30,
          left: 15,
          right: 15,
          bottom: MediaQuery.of(context).viewInsets.bottom + 50,
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.end,
          children: [
            TextField(
              controller: _nameController,
              decoration: InputDecoration(
                  border: OutlineInputBorder(), hintText: "Nombre"),
            ),
            SizedBox(height: 10),
            TextField(
              controller: _cityController,
              maxLines: 4,
              decoration: InputDecoration(
                border: OutlineInputBorder(),
                hintText: "Ciudad",
              ),
            ),
            SizedBox(height: 20),
            Center(
              child: ElevatedButton(
                onPressed: () async {
                  if (id == null) {
                    await _addData();
                  }
                  if (id != null) {
                    await _updateData(id);
                  }

                  _nameController.text = "";
                  _cityController.text = "";

                  Navigator.of(context).pop();
                  print("Registro Adicionado");
                },
                child: Padding(
                  padding: EdgeInsets.all(18),
                  child: Text(
                    id == null ? "Adicionar" : "Actualizar",
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.w500),
                  ),
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Color(0XFFECEAF4),
      appBar: AppBar(
        title: Text("Lista Usuarios"),
      ),
      body: _isLoading
          ? Center(
              child: CircularProgressIndicator(),
            )
          : ListView.builder(
              itemCount: _allData.length,
              itemBuilder: (context, index) => Card(
                margin: EdgeInsets.all(15),
                child: ListTile(
                  title: Padding(
                    padding: EdgeInsets.symmetric(vertical: 5),
                    child: Text(
                      _allData[index]['name'],
                      style: TextStyle(
                        fontSize: 20,
                      ),
                    ),
                  ),
                  subtitle: Text(_allData[index]['city']),
                  trailing: Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      IconButton(
                        onPressed: () {
                          showBottomSheet(_allData[index]['id']);
                        },
                        icon: Icon(
                          Icons.edit,
                          color: Colors.indigo,
                        ),
                      ),
                      IconButton(
                        onPressed: () {
                          _deleteData(_allData[index]['id']);
                        },
                        icon: Icon(
                          Icons.delete,
                          color: Colors.redAccent,
                        ),
                      ),
                    ],
                  ),
                ),
              ),
            ),
      floatingActionButton: FloatingActionButton(
        onPressed: () => showBottomSheet(null),
        child: Icon(Icons.add),
      ),
    );
  }
}
