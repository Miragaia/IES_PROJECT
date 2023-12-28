package com.SensorSafe.API.auth;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import com.SensorSafe.API.tokens.JwtUserDetailsService;

@Component
public class MyAuthProvider implements AuthenticationProvider {

    private JwtUserDetailsService userDetailsService;

    @Autowired
    public MyAuthProvider(JwtUserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        
        UserDetails user = userDetailsService.loadUserByUsername(authentication.getPrincipal().toString());
        String provide_password = authentication.getCredentials().toString();
        String user_password = user.getPassword();
        
        if (provide_password.equals(user_password)) {
            return new UsernamePasswordAuthenticationToken(user, authentication.getCredentials(), user.getAuthorities());
        } else {
            throw new BadCredentialsException("Bad Credentials");
        }

    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}
