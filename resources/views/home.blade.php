<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>{{ config('app.name', 'Laravel') }}</title>
    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
<form id="logout-form" action="{{ route('logout') }}" method="POST">
    @csrf
</form>
<div id="app">
</div>
</body>
<!-- Scripts -->
<script>
    var LogoutFunc = function () {
        document.getElementById('logout-form').submit();
    };
    var token = "{{Auth::user() ? JWTAuth::fromUser(Auth::user()) : "" }}";
    var username = "{{ Auth::user() ? Auth::user()->name : "GUEST" }}";
</script>
<script src="{{ asset('js/app.js') }}" defer></script>
</html>
