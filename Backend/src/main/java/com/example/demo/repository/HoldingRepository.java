package com.example.demo.repository;

import com.example.demo.entity.Holding;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HoldingRepository extends JpaRepository<Holding, Long> {

	 List<Holding> findByUserId(Long userId);
}
