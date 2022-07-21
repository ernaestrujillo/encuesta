package com.globalquark.encuesta.repositorys;

import com.globalquark.encuesta.models.Encuesta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EncuestaRepository extends JpaRepository<Encuesta,Long> {
    List<Encuesta> findByNombreEncuestaContaining(String nombreEncuesta);
}
