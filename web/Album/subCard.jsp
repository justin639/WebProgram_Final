<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>

<%@ page import="java.sql.*" %>
<%
    // remove from users imgList
    // split
    try {
        String uid = request.getParameter("uidOut");
        String imgList = request.getParameter("imgList");
        Class.forName("com.mysql.cj.jdbc.Driver");  // MySQL database connection
        Connection connUser = DriverManager.getConnection("jdbc:mysql://localhost:3306/websitedb?useUnicode=true&serverTimezone=Asia/Seoul", "root", "2358");

        String sql = "UPDATE users where userID = ? set fileList = ? ";
        PreparedStatement pst = null;
        pst = connUser.prepareStatement(sql);
        pst.setString(1, uid);
        pst.setString(2, imgList);
        pst = connUser.prepareStatement(sql);

        pst.executeUpdate();

    } catch (Exception e) {
        out.println("Something went wrong !! Please try again" + e);
    }
    // add to images
    try {
        String imgTime = request.getParameter("imgTime");
        Class.forName("com.mysql.cj.jdbc.Driver");  // MySQL database connection
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/websitedb?useUnicode=true&serverTimezone=Asia/Seoul", "root", "2358");

        String sql = "DELETE FROM images WHERE imageTime = ?";
        PreparedStatement pst = null;
        pst = conn.prepareStatement(sql);
        pst.setString(1, imgTime);

        pst.executeUpdate();

    } catch (Exception e) {
        out.println("Something went wrong !! Please try again" + e);
    }
%>

</body>
</html>
