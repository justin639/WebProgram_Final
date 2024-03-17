<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<%@ page import="java.sql.*" %>
<%
    // append to users imgList
    try {
        String uid = request.getParameter("uidIn");
        String fileList = request.getParameter("imageTime");
        Class.forName("com.mysql.cj.jdbc.Driver");  // MySQL database connection
        Connection connUser = DriverManager.getConnection("jdbc:mysql://localhost:3306/websitedb?useUnicode=true&serverTimezone=Asia/Seoul", "root", "2358");

        String sql = "UPDATE users WHERE userID = ? SET fileList = CONCAT(fileList, ?)";
        PreparedStatement pst = null;
        pst = connUser.prepareStatement(sql);
        pst.setString(1, uid);
        pst.setString(2, "_" + fileList);

        pst.executeUpdate();

    } catch (Exception e) {
        out.println("Something went wrong !! Please try again" + e);
    }
    // add to images
    try {
        String imageTime = request.getParameter("imageTime");
        String img_url = request.getParameter("img_url");
        String title = request.getParameter("title");
        String description = request.getParameter("description");
        Class.forName("com.mysql.cj.jdbc.Driver");  // MySQL database connection
        Connection connFile = DriverManager.getConnection("jdbc:mysql://localhost:3306/websitedb?useUnicode=true&serverTimezone=Asia/Seoul", "root", "2358");

        String sql = "insert into images(imageTime,imgUrl,imgTitle,imgDescription)values(?,?,?,?)";
        PreparedStatement pst = null;
        pst = connFile.prepareStatement(sql);
        pst.setString(1, imageTime);
        pst.setString(2, img_url);
        pst.setString(3, title);
        pst.setString(4, description);

        pst.executeUpdate();

    } catch (Exception e) {
        out.println("Something went wrong !! Please try again" + e);
    }
%>

</body>
</html>
