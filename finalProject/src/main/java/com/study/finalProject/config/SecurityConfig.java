package com.study.finalProject.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;



@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        return http
        	    .securityMatcher("/**")
        	    .authorizeHttpRequests(auth -> auth
        	        .requestMatchers("/", "/login", "/loginPage", "/signup", "/css/**", "/js/**", "/img/**", "/dicom-file/**")
        	        .permitAll()
        	        .anyRequest().authenticated()
        	    )
        	    .formLogin(form -> form
        	        .loginPage("/loginPage")
        	        .usernameParameter("memId")
        	        .passwordParameter("password")
        	        .loginProcessingUrl("/login_check")
        	        .failureUrl("/loginForm?error")
        	        .defaultSuccessUrl("/studyList")
        	    )
        	    .logout(logout -> logout
        	        .logoutUrl("/logout")
        	        .logoutSuccessUrl("/loginPage")
        	        .invalidateHttpSession(true)
        	    )
        	    .csrf(csrf -> csrf.disable())
        	    .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}

