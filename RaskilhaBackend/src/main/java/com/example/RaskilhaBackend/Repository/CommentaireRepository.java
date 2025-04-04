package com.example.RaskilhaBackend.Repository;

import com.example.RaskilhaBackend.Entity.Commentaire;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CommentaireRepository extends JpaRepository<Commentaire, Long> {
    List<Commentaire> findByPubId(Long pubId);
}
