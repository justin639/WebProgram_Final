        <%@page import="example.Authentication" %>
<%@page import="java.util.*" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>LogIn</title>
    <link rel="stylesheet" href="CSS/master.css">
    <script src="JS/jquery-3.5.1.min.js" type="text/javascript"></script>
</head>
<body>

<!-- table for transporting DB to JS -->
<table id="userListDB" align="center" hidden>
    <%
        Authentication connecttoSearch = new Authentication();
        String isEmail = request.getParameter("email");
        String isPassword = request.getParameter("password");

        List authlist = connecttoSearch.doPost(isEmail, isPassword);

        if (authlist != null && authlist.size() > 0) {
    %>
    <tr>
        <th>UID</th>
        <th>Email</th>
        <th>Password</th>
    </tr>
    <%
        for (int i = 0; i < authlist.size(); i++) {
            List user = (List) authlist.get(i);
    %>
    <tr>
        <td class="uid"><%=user.get(0)%></td>
        <td class="email"><%=user.get(1)%></td>
        <td class="password"><%=user.get(2)%></td>
    </tr>
    <%
        }
    } else {
    %>
    Not Available Any Book Details
    <%}%>

</table>

<div class="container">
    <!-- Switching Between Login and Sign Up -->
    <div class="row">
        <div id="loginTitle" class="title big selected" onclick="changeState(0)">Login</div>
        <div id="signUpTitle" class="title big" onclick="changeState(1)">Sign Up</div>
    </div>

    <!-- The input forms section -->
    <div id="inputTable">

        <!-- Login section -->
        <div id="login">
            <p class="big bold">Login</p>
            <p id="inputMessage" class="bold">Enter user name and password:</p>

            <!-- input table  -->
            <form id="loginForm" action="Album/album.jsp">

                <!-- email -->
                <div class="inputWrapper">
                    <p class="inTitle">Email</p>
                    <div id="emailAuthWrapper" class="wrapper">
                        <input id="emailAuth" name="email" type="email" placeholder=" Email" value=""
                               autocomplete="username">
                    </div>
                </div>

                <!-- password -->
                <div class="inputWrapper">
                    <p class="inTitle">Password</p>
                    <div id="passAuthWrapper" class="wrapper">
                        <input id="passAuth" name="password" type="password" placeholder=" Password" value=""
                               autocomplete="current-password">
                    </div>
                </div>
            </form>

            <!-- LogIn Button -->
            <!-- clicked: Auth valid, submit -->
            <button id="logInBtn" class="big">Login</button>

        </div>

        <!-- Sign Up section -->
        <div id="signUp" hidden>
            <p class="big bold">Sign Up</p>
            <p class="bold">Fill in the form:</p>

            <!-- input table  -->
            <form id="singInForm" action="register.jsp" method="get" target="register">

                <!-- First Name -->
                <div class="inputWrapper">
                    <p class="inTitle">First name</p>
                    <div id="firstNameWrapper" class="wrapper">
                        <input id="firstName" name="firstName" type="text" placeholder="First name" value=""
                               autocomplete="username">
                    </div>
                </div>

                <!-- Last Name -->
                <div class="inputWrapper">
                    <p class="inTitle">Last name</p>
                    <div id="lastNameWrapper" class="wrapper">
                        <input id="lastName" name="lastName" type="text" placeholder="Last name" value=""
                               autocomplete="username">
                    </div>
                </div>

                <!-- Gender with Radio input -->
                <div id="genderWrapper" class="inTitle wrapper" style="height: 20px">
                    <div style="width: 428px">
                        <input class="radio" id="male" name="gender" type="radio" value="male">
                        <label for="male">Male</label>
                        <input class="radio" id="female" name="gender" type="radio" value="female">
                        <label for="female">Female</label>
                    </div>
                </div>

                <!-- Email -->
                <div class="inputWrapper">
                    <p class="inTitle">Email</p>
                    <div id="emailWrapper" class="wrapper">
                        <input id="email" name="email" type="email" placeholder=" Email" value=""
                               autocomplete="username">
                    </div>
                </div>

                <!-- Password -->
                <div class="inputWrapper">
                    <p class="inTitle">Password</p>
                    <div id="passwordWrapper" class="wrapper">
                        <input id="password" name="password" type="password" placeholder="Password" value=""
                               autocomplete="current-password">
                    </div>
                </div>

                <!-- Confirm Password -->
                <div class="inputWrapper">
                    <p class="inTitle">Confirm password</p>
                    <div id="confirmPassWrapper" class="wrapper">
                        <input id="confirmPass" name="confirmPass" type="password" placeholder="Confirm password"
                               value=""
                               autocomplete="current-password">
                    </div>
                </div>

            </form>

            <iframe name="register" hidden></iframe>

            <!-- Sign Up Button -->
            <!-- clicked: if valid form, register on mysql -->
            <button id="signUpBtn" class="big">Sign Up</button>
        </div>
        <!-- Message section -->
        <div id="message" hidden>
            <p id="taskMessage" class="big bold">message</p>
        </div>
    </div>
</div>

<script src="JS/script.js" type="text/javascript"></script>
</body>
</html>