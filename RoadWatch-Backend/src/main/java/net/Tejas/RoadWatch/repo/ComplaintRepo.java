package net.Tejas.roadwatch.repo;

import net.Tejas.roadwatch.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplaintRepo extends JpaRepository<Complaint,Integer> {

}
