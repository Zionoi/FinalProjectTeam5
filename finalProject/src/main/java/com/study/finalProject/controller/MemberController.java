package com.study.finalProject.controller;



import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.study.finalProject.domain.Member;
import com.study.finalProject.service.MemberService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;




@Controller
@SessionAttributes({"loginUser"})
public class MemberController {

	@Autowired
    private MemberService memberService;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	HttpSession session;

//	@GetMapping("/loginPage")
//    public String login() {
//    	// 현재 인증된 사용자를 가져옴
//        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
//        System.out.println("로그인페이지 확인 authentication :"+authentication);
//        // 사용자가 인증되지 않았는지 확인
//        if (authentication == null) {
//            // 인증되지 않은 경우 -> 로그인 페이지로 리다이렉트
//            return "loginPage";
//        }
//        
//        // 인증된 사용자가 존재하는 경우 -> 스터디 목록 페이지로 리다이렉트
//        return "redirect:/studyList";
//    }
	
	@GetMapping("/loginPage")
	public String loginPage() {
		return "loginPage";
	}
	
    // 모든 회원 목록 페이지
    @GetMapping("/members")
    public String getAllMembers(Model model) {
        List<Member> members = memberService.getAllMembers();
        model.addAttribute("members", members);
        return "memberList"; // 타임리프 템플릿 파일 이름 (memberList.html)
    }

    // 특정 회원 상세 페이지
    @GetMapping("/members/{id}")
    public String getMemberById(@PathVariable String id, Model model) {
        memberService.getMemberById(id).ifPresent(member -> model.addAttribute("member", member));
        return "memberDetail"; // 타임리프 템플릿 파일 이름 (memberDetail.html)
    }

    // 회원가입 폼 페이지를 반환
    @GetMapping("/signup")
    public String signupForm() {
        return "signup";
    }

    // 회원가입 요청을 처리
    @PostMapping("/signup")
    public String signup(@ModelAttribute Member member, @RequestParam("patientNames") String patientNames) {
        // 콤마로 구분된 환자 이름 리스트를 변환
        if (patientNames != null && !patientNames.isEmpty()) {
            List<String> patientsList = Arrays.asList(patientNames.split(","));
            member.setPatientNames(patientsList);
        }
        // 비밀번호 암호화
        member.setPassword(passwordEncoder.encode(member.getPassword()));
        // 사용자 정보 저장
        memberService.saveOrUpdateMember(member);

        return "redirect:/loginPage";  // 회원가입 후 로그인 페이지로 리다이렉트
    }

    // 회원 삭제
    @PostMapping("/members/{id}/delete")
    public String deleteMember(@PathVariable String id) {
        memberService.deleteMember(id);
        return "redirect:/members";
    }
    
    
    @GetMapping("/members/idCheck")
	public @ResponseBody boolean checkId(@RequestParam("id") String id) {
		return memberService.idCheck(id);
	}
    
    @GetMapping("/logout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        new SecurityContextLogoutHandler().logout(request, response, SecurityContextHolder.getContext().getAuthentication());
        return "redirect:/loginPage";
    }
    
//    
//    @PostMapping("/login")
//	public String login(Member member, Model model) {
//		System.out.println("로그인 컨트롤러 메소드 실행확인 member : " + member);
//		Optional<Member> loginUser = memberService.getMemberById(member);
//		if(loginUser.isPresent()) {
//			Member m = loginUser.get();
//			if(passwordEncoder.matches(member.getPassword(), m.getPassword())) { // passwordEncoder.matches(input비번, DB비번) : 입력한 비번과 db비번이 맞는지 비교해주는 메소드
//				model.addAttribute("loginUser",m);	// model은 requestScope임 loginUser를 세션에 담으려면 위쪽에 세션으로 바꿔주는 @SessionAttributes({"loginUser"}) 어노테이션을 사용
//			}
//		}
//		String url = (String)session.getAttribute("boardDetailUrl");
//		if(url == null) {
//			url = "studyList";
//		}
//		return "redirect:"+url;
//	}
    
    
    
    
}
