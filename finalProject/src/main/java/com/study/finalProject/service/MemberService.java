package com.study.finalProject.service;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.study.finalProject.domain.Member;
import com.study.finalProject.repository.MemberRepository;

@Service
public class MemberService {

	@Autowired
    private MemberRepository memberRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;

  

    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    public Optional<Member> getMemberById(String id) {
        return memberRepository.findById(id);
    }

    public void saveOrUpdateMember(Member member) {
        memberRepository.save(member);
    }

    public void deleteMember(String id) {
        memberRepository.deleteById(id);
    }
    
    public boolean idCheck(String id) {
		// .existsById() : 아이디가 존재하는지 DB 확인해주는 JPA 자체 메소드. 반환결과 true or false반환
		return memberRepository.existsById(id);	
	}

//    public Optional<Member> login(Member member) {
//		return memberRepository.findById(member.getMemId());
//		
//	}
// 

}
