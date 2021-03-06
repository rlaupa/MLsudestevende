var usuarios = usuarios || (function () {
		var click = false;
        //agrego funcion para validar edad
        jQuery.validator.addMethod("mayorA", 
			function(value, element, params) {
			    x = false;
			    if (value != null) {

			    	var haceXAnios = new Date(new Date().setFullYear(new Date().getFullYear() - params));
					
					var dd = haceXAnios.getDate();
					var mm = haceXAnios.getMonth()+1;
					var yyyy = haceXAnios.getFullYear();
					if(dd<10){
					    dd='0'+dd;
					} 
					if(mm<10){
					    mm='0'+mm;
					}
					var result = yyyy+'-'+mm+'-'+dd;

					x = ((value < result) && ('1920-01-01' < value)); //por las dudas el 1920
			    }
				return x
			},'Debe ser mayor a {0} años.');       

        return {
        	guardar: function(el) {
        		var userForm = document.getElementById("edit-user-form");
        		var passForm = document.getElementById("edit-password-form");
        		var createUserForm = document.getElementById("create-user-form");
        		var loginUserForm = document.getElementById("login_usuario_form");
        		var forgotPassForm = document.getElementById("forgot_password_form");

        		if (el.form == userForm) {
        		
        			if (usuarios.validarUserEdit(el)) {
		        		usuarios.updateUser(el);
		        	}
        		} else if (el.form == passForm) {
					if(usuarios.validarPassword(el)) {
			        		usuarios.updateUser(el);
			        	}
        		} else if (el.form == createUserForm) {
        			if(usuarios.validarUserCreate(el)) {
        				usuarios.createUser(el);
        			}
        		} else if (el.form == loginUserForm) {
        			if(usuarios.validarUserLogin(el)) {
        				usuarios.loginUser(el);
        			}
        		} else if (el.form == forgotPassForm) {
        			if(usuarios.validarForgotPassword(el)) {
        				usuarios.forgotPassword(el);
        			}
        		} else {
	        		console.log('no se valido');
	        	}
        	},

        	validarUserEdit: function(el) {
        		var formPadre = el.form;
        	
        		$(formPadre).validate({
			        rules: {
			            persona_nombres: {
			                minlength: 3,
			                required: true
			            },
			            persona_apellidos: {
			                minlength: 2,
			                required: true
			            },
			            persona_fecha_nacimiento: {
			            	mayorA: 18
			            },
			            persona_direccion: {
			            	required: true
			            },
			            persona_email: {
			            	required: true
			            },
			            persona_celular_codigo: {
			            	required:true,
			            	maxlength: 5
			            },
			            persona_celular: {
			            	required: true,
			            	maxlength: 8
			            }
			        },
        			errorClass: "alert-danger",
        			validClass: "alert-success"
			    });
        		
			    jQuery.extend(jQuery.validator.messages, {
				    required: "",
				    email: "",
				    date: "",
				    number: "",
				    maxlength: jQuery.validator.format(""),
				    minlength: jQuery.validator.format("")
				});

			    return $(formPadre).valid();

        	},
        	validarPassword: function(el) {

				var formPadre = el.form;

        		$(formPadre).validate({
        			rules: {
			            usuario_password: {
			            	required: true
			            },
			            usuario_password_confirm: {
			            	equalTo: "#usuario_password_id"
			            }
        			},
        			errorClass: "alert-danger",
        			validClass: "alert-success"
			    });
        		
			    jQuery.extend(jQuery.validator.messages, {
				    minlength: jQuery.validator.format(""),
				    equalTo: "Las contraseñas no coinciden"
				});
        		
        		return $(formPadre).valid();

        	},
        	validarUserCreate: function(el) {
        		var formPadre = el.form;

        		$(formPadre).validate({
			        rules: {
			            persona_nombres: {
			                minlength: 3,
			                required: true
			            },
			            persona_apellidos: {
			                minlength: 2,
			                required: true
			            },
			            usuario_username: {
			            	minlength:3,
			            	required: true
			            },
			            persona_email: {
			            	required: true
			            },
			            persona_fecha_nacimiento: {
			            	mayorA: 18
			            },
			            persona_direccion: {
			            	required: true
			            },
			            persona_celular_codigo: {
			            	required:true,
			            	maxlength: 5
			            },
			            persona_celular: {
			            	required: true,
			            	maxlength: 8
			            },
			            usuario_password: {
			            	required: true
			            },
			            usuario_password_confirm: {
			            	equalTo: "#usuario_password_id"
			            }
			        },
        			errorClass: "alert-danger",
        			validClass: "alert-success"
			    });

        		jQuery.extend(jQuery.validator.messages, {
				    required: "",
				    email: "",
				    date: "",
				    number: "",
				    maxlength: jQuery.validator.format(""),
				    minlength: jQuery.validator.format(""),
				    equalTo: "Las contraseñas no coinciden"
				});

				return $(formPadre).valid();
        	},
        	validarUserLogin: function(el) {
        		var formPadre = el.form;

        		$(formPadre).validate({
        			rules: {
        				usuario_username: {
        					required: true
        				},
        				usuario_password: {
        					required: true
        				}

        			},
        			errorClass: "alert-danger",
        			validClass: "alert-success"
        		});

        		jQuery.extend(jQuery.validator.messages, {
				    required: ""
				});

				return $(formPadre).valid();
        	},
        	validarForgotPassword: function(el) {
        		var formPadre = el.form;

        		var formPadre = el.form;

        		$(formPadre).validate({
        			rules: {
        				usuario_username: {
        					required: true
        				},
        				usuario_email: {
        					required: true
        				}
        			},
        			errorClass: "alert-danger",
        			validClass: "alert-success"
        		});

        		jQuery.extend(jQuery.validator.messages, {
				    required: "",
				    email: ""
				});

				return $(formPadre).valid();
        	},

        	validarUsername: function(el) {
        		if (el.value!='') {
        			var data = {usuario_username : el.value}
	        		$.ajax({
	        			data: data,
						url: '/usuarios/confirmar_usuario_unico',
						type: 'GET',
						contentType: 'application/x-www-form-urlencoded',
						success: function(response) {
							if (response.exito) {
								$('#inputUsernameStatusSpan').removeClass('glyphicon-remove').addClass('glyphicon glyphicon-ok form-control-feedback');
								$(el).parent().parent().parent().removeClass('has-error').addClass('has-success has-feedback')
							} else {
								$('#inputUsernameStatusSpan').addClass('glyphicon glyphicon-remove form-control-feedback');
								$(el).parent().parent().parent().addClass('has-error has-feedback')
							}
						}

	        		})
        		}
        		
        	},
        	validarEmail: function(el) {
        		if (el.value!='') {
        			var data = {usuario_email : el.value}
	        		$.ajax({
	        			data: data,
						url: '/usuarios/confirmar_email_unico',
						type: 'GET',
						contentType: 'application/x-www-form-urlencoded',
						success: function(response) {
							if (response.exito) {
								$('#inputEmailStatusSpan').removeClass('glyphicon-remove').addClass('glyphicon glyphicon-ok form-control-feedback');
								$(el).parent().parent().parent().removeClass('has-error').addClass('has-success has-feedback')
							} else {
								$('#inputEmailStatusSpan').addClass('glyphicon glyphicon-remove form-control-feedback');
								$(el).parent().parent().parent().addClass('has-error has-feedback')
							}
						}

	        		})
        		}
        		
        	},

        	updateUser: function(el) {
        		if(!click) {
					var data = $(el.form).serializeObject();
					$.ajax({
						data: data,
						url: '/usuarios/update_user		',
						type: 'PUT',
						contentType: 'application/x-www-form-urlencoded',
						beforeSend: function () {
							click=true;
							console.log('cargando');
						},
						success: function (response) {
							click=false;
							if (response.exito) {
								$(el).attr('class', 'btn btn-success');
								$(el).html("Se actualizo");
							} else {
								alert("crea una cuenta :3");
							}
						}
					})
				}
        	},
        	createUser: function(el) {
        		var data = $(el.form).serializeObject();        		

        		$.ajax({
                    data : data,
                    url : '/usuarios/new_user',
                    type : 'POST',
					contentType : 'application/x-www-form-urlencoded',
					beforeSend: function() {
						console.log('cargando createUser');
					},
					success: function(response) {
						if (response.exito) {
							$("#save").attr('class','btn btn-success');
							$("#save").attr("value","Su cuenta ha sido creada con exito");
							$("#save").attr("onclick","");
							setTimeout(function(){ window.location.replace("/ingresar"); }, 1000);
						} else {
							alert("Hubo un error, intentelo de nuevo");
							window.location.replace("/registrandome");
						}
					}
                })
        	},
        	loginUser: function(el) {
        		var data = $(el.form).serializeObject();
				if(!click) {
					$.ajax({
						data: data,
						url: 'usuarios/login',
						type: 'POST',
						contentType: 'application/x-www-form-urlencoded',
						beforeSend: function () {
							click=true;
							$('#msg').removeClass();
							$('#msg').addClass('alert alert-info');
							$('#msg').html('Cargando...');
							$('#msg').focus();
						},
						success: function (response) {
							click = false;
							if (response.exito) {
								$('#msg').removeClass();
								$('#save').remove();
								$('#msg').addClass('alert alert-success');
								$('#msg').html('Ha ingresado correctamente');
								$('#msg').focus();
								setTimeout(
									function () {
										window.location.href = "/"
									}
									, 1500);

							} else {
								$('#msg').removeClass();
								$('#msg').addClass('alert alert-warning');
								$('#msg').html('Usuario y/o clave incorrectos');
								$('#msg').focus();
							}
						},
						error:function(){
							click=false;
							$('#msg').removeClass();
							$('#msg').addClass('alert alert-warning');
							$('#msg').html('Ops ocurrio un error inesperado');
							$('#msg').focus();
						}

					})
				}
        	},
        	forgotPassword: function(el) {
        		var data = $(el.form).serializeObject();
        		if(!click) {
					$.ajax({
						data: data,
						url: '/usuarios/forgot_password',
						type: 'GET',
						contentType: 'application/x-www-form-urlencoded',
						beforeSend: function () {
							click=true;
							$('#msg').removeClass();
							$('#msg').addClass('alert alert-info');
							$('#msg').html('Cargando...');
							$('#msg').focus();
						},
						success: function (response) {
							click = false;
							console.log(response);
							if (response.exito) {
								$('#msg').removeClass();
								$('#save').remove();
								$('#msg').addClass('alert alert-success');
								$('#msg').html(response.msg);
								$('#msg').focus();
								setTimeout(
									function () {
										window.location.href = "/"
									}
									, 3000);

							} else {
								$('#msg').removeClass();
								$('#msg').addClass('alert alert-danger');
								$('#msg').html(response.msg);
								$('#msg').focus();
							}
						},
						error:function(){
							click=false;
							$('#msg').removeClass();
							$('#msg').addClass('alert alert-warning');
							$('#msg').html('Ops ocurrio un error inesperado');
							$('#msg').focus();
						}

					})
				}
        	}
        }
	}());



