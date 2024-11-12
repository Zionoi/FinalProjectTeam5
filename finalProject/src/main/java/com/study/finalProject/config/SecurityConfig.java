package com.study.finalProject.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.study.finalProject.service.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//            .authorizeHttpRequests()
//            .requestMatchers("/", "/login", "/loginPage", "/signup", "/css/**", "/js/**", "/img/**").permitAll()
//            .anyRequest().authenticated()
//            .login("/loginPage")
//            .defaultSuccessUrl("/studyList")
//            .failureUrl("/loginPage?error=true")  // 로그인 실패 시 리다이렉트 설정
//            .permitAll()
//            .logout()
//            .logoutUrl("/logout")
//            .logoutSuccessUrl("/loginPage")
//            .permitAll()
//            .csrf(csrf -> csrf.disable());
//
//        return http.build();
//        
    	System.out.println("시큐리티 컨피크 HTTP" + http);
        return http
                .authorizeRequests()
                .requestMatchers("/", "/login", "/loginPage", "/signup", "/css/**", "/js/**", "/img/**", "/dicom-file/**").permitAll()
                .anyRequest().authenticated()
                .and()
                .formLogin()
                .loginPage("/loginPage")
                .usernameParameter("memId")  // memId 필드를 username 대신 사용
                .passwordParameter("password")
                .loginProcessingUrl("/login_check")
                .failureUrl("/loginForm?error")
                .defaultSuccessUrl("/studyList")
                .and()
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/loginPage")
                .invalidateHttpSession(true)
                .and()
                .csrf().disable()
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
