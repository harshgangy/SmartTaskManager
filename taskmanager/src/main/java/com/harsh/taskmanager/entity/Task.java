package com.harsh.taskmanager.entity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "tasks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Task
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String description;

    private String status;   // TODO, IN_PROGRESS, DONE

    private String priority; // LOW, MEDIUM, HIGH

    private LocalDate dueDate;
}
