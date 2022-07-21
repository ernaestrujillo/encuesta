package com.globalquark.encuesta.repositorys;


import com.globalquark.encuesta.models.Pregunta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface PreguntaRepository extends JpaRepository<Pregunta,Long> {

    List<Pregunta> findByEncuestaIdEncuesta(long id);
}
