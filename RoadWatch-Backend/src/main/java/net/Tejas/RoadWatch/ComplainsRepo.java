package net.Tejas.RoadWatch;

import net.Tejas.RoadWatch.Model.Complains;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComplainsRepo extends JpaRepository<Complains,Integer> {

}
