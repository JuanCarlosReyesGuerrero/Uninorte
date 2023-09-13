import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:sqflite/sqflite.dart' as sql;
import 'package:sqflite/sqlite_api.dart';

class SQLHelper {
  static Future<void> createTables(sql.Database database) async {
    String sqlQuery =
        ("""CREATE TABLE data(id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
    name TEXT,
    city TEXT,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    )""");

    await database.execute(sqlQuery);
  }

  static Future<sql.Database> db() async {
    return sql.openDatabase("database_name2.db", version: 1,
        onCreate: (sql.Database database, int version) async {
      await createTables(database);
    });
  }

  static Future<int> createData(String name, String? city) async {
    final db = await SQLHelper.db();

    final data = {'name': name, 'city': city};
    final id = await db.insert('data', data,
        conflictAlgorithm: sql.ConflictAlgorithm.replace);

    return id;
  }

  static Future<List<Map<String, dynamic>>> getAllData() async {
    final db = await SQLHelper.db();
    return db.query('data', orderBy: 'id');
  }

  static Future<int> updateData(int id, String name, String? city) async {
    final db = await SQLHelper.db();
    final data = {
      'name': name,
      'city': city,
      'createdAt': DateTime.now().toString()
    };
    final result =
        await db.update('data', data, where: "id = ?", whereArgs: [id]);

    return result;
  }

  static Future<void> deleteData(int id) async {
    final db = await SQLHelper.db();

    try {
      await db.delete('data', where: "id = ?", whereArgs: [id]);
    } catch (e) {}
  }
}
