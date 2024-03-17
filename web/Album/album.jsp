<!DOCTYPE html>
<html lang="en" dir="ltr">

<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <script src="https://kit.fontawesome.com/c85d62c8b6.js"></script>
    <title>Album</title>
    <!-- including bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
    <link rel="stylesheet" href="../CSS/album_master.css">
    <script src="../JS/jquery-3.5.1.min.js" type="text/javascript"></script>
    <!-- including bootstrap js -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.10.2/dist/umd/popper.min.js"
            integrity="sha384-7+zCNj/IqJ95wo16oMtfsKbZ9ccEh31eOz1HGyDuCQ6wgnyJNSYdrPa03rtR1zdB"
            crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js"
            integrity="sha384-QJHtvGhmr9XOIpI6YVutG+2QOK9T+ZnN4kzFN1RtK3zEFEIsxhlmWl5/YESvpZ13"
            crossorigin="anonymous"></script>

</head>
<body style="background-color: #384047">

<!--  -->
<%@ page import ="java.sql.*" %>
<% String firstName=""; Integer userID = 0; String fileList;
    try{

        String email = request.getParameter("email");
        String password = request.getParameter("password");
        Class.forName("com.mysql.cj.jdbc.Driver");  // MySQL database connection
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/websitedb?useUnicode=true&serverTimezone=Asia/Seoul","root","2358");
        PreparedStatement pst = conn.prepareStatement("Select userID,email,password,firstName, fileList from users where email=? and password=?");

        pst.setString(1, email);
        pst.setString(2, password);
        ResultSet rs = pst.executeQuery();
        if(rs.next()){
            userID = rs.getInt("userID");
            firstName = rs.getString("firstname");
            fileList = rs.getString("fileList");
        }
        else{
            userID = 0;
            firstName = "";
        }
    }
    catch(Exception e){
        out.println("Something went wrong !! Please try again" + e);
    }
%>




<div id="mainContent">
    <!-- Header section -->
    <header class="navbar bg-light">
        <div class="container-fluid">
            <span class="navbar-brand green fw-bold" style="color: green" > Welcome, <%=firstName%></span>
            <div class="d-flex">
                <button id="addNewBtn" type="button" data-bs-toggle="modal" data-bs-target="#addDialog"
                        class="btn btn-success fw-bold">&plus;Add New
                </button>
            </div>

        </div>
    </header>

    <!-- To do card section column with 3 -->
    <div class="container">
        <div id="todoCardArea" class="row row-cols-3">
            <!-- todo-cards to be added -->
        </div>
    </div>
</div>

<!-- Add To do card Dialog -->
<div id="addDialog" class="modal fade" tabindex="-1">
    <div class="modal-dialog">
        <div class="modal-content">
            <!-- modal Dialog header -->
            <div class="modal-header">
                <h5 class="modal-title">Add New Task</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" onclick="resetInput()" aria-label="Close"></button>
            </div>
            <!-- modal Dialog body -->
            <div class="modal-body">
                <!-- input forms written -->
                <form id="todoForm" action="addCard.jsp" target="addCard">
                    <!-- image url -->
                    <div class="mb-3">
                        <label for="img_url" class="col-form-label">Image url</label>
                        <input type="text" id="img_url" name="img_url" class="form-control"
                               placeholder="https://image.com">
                    </div>
                    <!-- title -->
                    <div class="mb-3">
                        <label for="taskTitle" class="col-form-label">Image Title</label>
                        <input type="text" id="taskTitle" class="form-control" name="title"
                               placeholder="2020/20/1/FRI/00:00:00">
                    </div>
                    <!-- description -->
                    <div class="mb-3">
                        <label for="taskDesc" class="col-form-label">Description</label>
                        <textarea type="text" id="taskDesc" name="description" class="form-control"
                                  placeholder="Description in detail"></textarea>
                    </div>
                    <input id="imageTime" name="imageTime" hidden>
                    <input id="uidIn" name="uidIn" value="<%=userID%>" hidden>

                </form>
            </div>
            <!-- modal Dialog footer -->
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="resetInput()">Close</button>
                <button id="save" type="button" class="btn btn-primary" onclick="addTodoCard()">Save changes</button>
            </div>
        </div>
    </div>
</div>

<iframe name="addCard" hidden></iframe>
<iframe name="sudCard" hidden></iframe>

<!-- script at last of html for initializing after document is drawn -->
<script src="../JS/album_script.js" type="text/javascript"></script>

</body>
</html>
