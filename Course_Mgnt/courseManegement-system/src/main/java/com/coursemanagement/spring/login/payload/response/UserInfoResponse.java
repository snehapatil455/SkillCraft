package com.coursemanagement.spring.login.payload.response;

import java.util.List;

import org.springframework.http.ResponseCookie;

public class UserInfoResponse {
	private Long id;
	private String username;
	private String email;
	private List<String> roles;
	private String Cookie;
private boolean isAdmin;


	public boolean isAdmin() {
	return isAdmin;
}

public void setAdmin(boolean isAdmin) {
	this.isAdmin = isAdmin;
}

	public String getCookie() {
		return Cookie;
	}

	public void setCookie(String Cookie) {
		this.Cookie = Cookie;
	}

	public UserInfoResponse(Long id, String username, String email, List<String> roles,String Cookie,boolean isAdmin) {
		this.id = id;
		this.username = username;
		this.email = email;
		this.roles = roles;
		this.Cookie= Cookie;
		this.isAdmin = isAdmin;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<String> getRoles() {
		return roles;
	}
}
