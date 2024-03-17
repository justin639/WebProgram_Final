package example;
import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;
import java.sql.*;
import java.util.*;

public class Authentication {
  public Authentication(){

  }
  public List doPost(String email, String password) {

    List  authList = new ArrayList();

    String isEmail = email;
    String isPassword = password;

    String sqlQuery = "SELECT * FROM users WHERE userID LIKE '%%' ";
    if(isEmail!=null && !(isEmail.equals(""))){
      sqlQuery += " and email= '"+ isEmail +"'";
    }
    if(isPassword!=null && !(isPassword.equals(""))){
      sqlQuery += " and password= '"+ isPassword +"'";
    }

    try {
      Class.forName("com.mysql.cj.jdbc.Driver");  // MySQL database connection
      Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/websitedb?" +
              "user=root&password=2358");
      try {
        Statement st = conn.prepareStatement(sqlQuery);
        ResultSet rs = st.executeQuery(sqlQuery);
        while (rs.next()) {
          List users = new ArrayList();
          users.add(rs.getInt(1));
          users.add(rs.getString(2));
          users.add(rs.getString(6));
          authList.add(users);
        }
      } catch (SQLException s) {
        System.out.println("SQL statement is not executed!");
      }
    }
    catch (Exception e){
      e.printStackTrace();
    }
    return authList;
  }
}
