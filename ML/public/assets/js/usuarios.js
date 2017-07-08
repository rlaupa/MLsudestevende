var usuarios = usuarios || (function () {
        var parametros = {};
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
        		console.log(createUserForm);
        		if (el.form == userForm) {
        		
        			if (usuarios.validarUserEdit(el)) {
		        		usuarios.updateUser(el);
		        	}
        		} else if (el.form == passForm) {
        			console.log("form edit password");
					if(usuarios.validarPassword(el)) {
			        		console.log('validPassword() es true')
			        		usuarios.updateUser(el);
			        	}
        		} else if (el.form == createUserForm) {
        			console.log("form create user");
        			if(usuarios.validarUserCreate(el)) {
        				console.log('validUserCreate() es true');
        				usuarios.createUser(el);
        				//usuarios.CreateUser(el,id);
        			}
        		} else if (el.form == loginUserForm) {
        			console.log("form login user");
        			if(usuarios.validarUserLogin(el)) {
        				console.log('validUserLogin() es true');
        				usuarios.loginUser(el);
        				//usuarios.CreateUser(el,id);
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
			        errorPlacement: function(error, element) {
					    error.insertAfter(element.parentElement);
					},
			        highlight: function (element) {
			            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
			            
			        },
			        success: function (element) {
			            element.addClass('valid')
			                .closest('.form-group').removeClass('has-error').addClass('has-success');
			        }
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
        				usuario_password: "required",
					    passverifyinput: {
					      equalTo: "#usuario_password"
					    }
        			},
			        errorPlacement: function(error, element) {
					    error.insertAfter(element.parentElement);
					},
			        highlight: function (element) {
			            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
			            
			        },
			        success: function (element) {
			            element.addClass('valid')
			                .closest('.control-group').removeClass('has-error').addClass('has-success');
			        }
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
			            }
			        },
			        errorPlacement: function(error, element) {
					    error.insertAfter(element.parentElement);
					},
			        highlight: function (element) {
			            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
			            
			        },
			        success: function (element) {
			            element.addClass('valid')
			                .closest('.form-group').removeClass('has-error').addClass('has-success');
			        }
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
			        errorPlacement: function(error, element) {
					    error.insertAfter(element.parentElement);
					},
			        highlight: function (element) {
			            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
			            
			        },
			        success: function (element) {
			            element.addClass('valid')
			                .closest('.form-group').removeClass('has-error').addClass('has-success');
			        }
        		});

        		jQuery.extend(jQuery.validator.messages, {
				    required: ""
				});

				return $(formPadre).valid();
        	},
        	updateUser: function(el) {
        		
        		var data = $(el.form).serializeObject();
                $.ajax({
                    data : data,
                    url : '/usuarios/update_user		',
                    type : 'PUT',
					contentType : 'application/x-www-form-urlencoded',
					beforeSend: function() {
						console.log('cargando');
					},
					success: function(response) {
						console.log(response);
						if (response.exito) {
							$("#savebutton").attr('class','btn btn-success');
							$("#savebutton").html("Se actualizo");
						} else {
							alert("crea una cuenta :3");
						}
					}
                })
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
							$("#savebutton").attr('class','btn btn-success');
							$("#savebutton").attr("value","Su cuenta ha sido creada con exito");
							$("#savebutton").attr("onclick","");
							setTimeout(function(){ window.location.replace("/ingresar"); }, 2000);
						} else {
							alert("Hubo un error, intentelo de nuevo");
							window.location.replace("/registrandome");
						}
					}
                })
        	},
        	loginUser: function(el) {
        		var data = $(el.form).serializeObject();

        		$.ajax({
                    data : data,
                    url : 'usuarios/login',
                    type : 'POST',
					contentType : 'application/x-www-form-urlencoded',
					beforeSend: function() {
						console.log('cargando loginUser');
					},
					success: function(response) {
						if (response.exito) {
							$("#savebutton").attr('class','btn btn-success');
							$("#savebutton").attr("value","Ha ingresado correctamente");
							$("#savebutton").attr("onclick","");
							setTimeout(function(){ window.location.replace("/"); }, 2000);
						} else {
							$("#savebutton").attr('class','btn btn-danger');
							$("#savebutton").attr("value","Usuario y/o clave incorrectos");
							setTimeout(function(){ window.location.replace("/ingresar"); }, 2000);
						}
					}
                })
        	}
        }
	}());


