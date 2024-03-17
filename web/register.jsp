<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title></title>
</head>
<body>
<%@ page import="java.sql.*" %>
<%
    try {
        String email = request.getParameter("email");
        String firstName = request.getParameter("firstName");
        String lastName = request.getParameter("lastName");
        String gender = request.getParameter("gender");
        String password = request.getParameter("password");
        Class.forName("com.mysql.cj.jdbc.Driver");  // MySQL database connection
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/websitedb?useUnicode=true&serverTimezone=Asia/Seoul", "root", "2358");

        String sql = "insert into users(email,firstName,lastName,gender,password)values(?,?,?,?,?)";
        PreparedStatement pst = null;
        pst = conn.prepareStatement(sql);
        pst.setString(1, email);
        pst.setString(2, firstName);
        pst.setString(3, lastName);
        pst.setString(4, gender);
        pst.setString(5, password);

        pst.executeUpdate();

    } catch (Exception e) {
        out.println("Something went wrong !! Please try again" + e);
    } %>
</body>
<script>parent.alert("Yo");</script>

</html>
