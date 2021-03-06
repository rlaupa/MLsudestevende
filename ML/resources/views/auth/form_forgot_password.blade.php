@include('encabezado')
</head>
<body>
	<div id="nav">
		@include('menu')
	</div>
	<div id="main">
		@include('menu.aside')
		<section  id="shop" class="results grid">
			<div class="main-login main-center clear-main">
				<div class="form white-bg b-shadow">
					<div class="form login">
						<h5 class="t-center">¿Olvido su contraseña?</h5>
						<form id="forgot_password_form" class="form-horizontal" method="post">
							<div class="form-group">
								<label for="usuario_username" class="col-sm-10">Usuario</label>
								<div class="col-sm-12">
									<div class="input-group">
										<span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
										<input type="text" class="form-control" name="usuario_username" id="usuario_username_id"  placeholder="Ingresa tu usuario"/>
									</div>
								</div>
							</div>

							<div class="form-group">
								<label for="usuario_password" class="col-sm-10">Email</label>
								<div class="col-sm-12">
									<div class="input-group">
										<span class="input-group-addon"><i class="fa fa-envelope" aria-hidden="true"></i></span>
										<input type="email" class="form-control" name="usuario_email" id="usuario_email_id"  placeholder="Ingresa tu email"/>
									</div>
								</div>
							</div>
							<div id="msg" class="hidden" role="alert" align="center">

							</div>
							<div class="form-group ">
								<input onclick="usuarios.guardar(this)" id="save" type="button" class="btn btn-primary btn-lg btn-block login-button" value="Recuperar Contraseña">
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	</div>
	@include('pie')
	<script type="text/javascript" src="/assets/js/forms/login/usuarios.js"></script>
</body>
</html>