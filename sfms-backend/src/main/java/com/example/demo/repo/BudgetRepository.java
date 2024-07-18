package com.example.demo.repo;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.entity.Budget;

public interface BudgetRepository extends JpaRepository<Budget, Long> {
    List<Budget> findAllByDateBetween(LocalDate startDate, LocalDate endDate);
}
