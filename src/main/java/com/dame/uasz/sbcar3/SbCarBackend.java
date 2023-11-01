package com.dame.uasz.sbcar3;

import java.util.Arrays;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.dame.uasz.sbcar3.domain.Car;
import com.dame.uasz.sbcar3.domain.CarRepository;
import com.dame.uasz.sbcar3.domain.Owner;
import com.dame.uasz.sbcar3.domain.OwnerRepository;
import com.dame.uasz.sbcar3.domain.User;
import com.dame.uasz.sbcar3.domain.UserRepository;

@SpringBootApplication
public class SbCarBackend implements CommandLineRunner {

	private static final Logger logger = 
			LoggerFactory.getLogger(SbCarBackend.class);
	
			@Autowired
			private CarRepository repository;
			
		
			@Autowired
			private OwnerRepository orepository;
			
			@Autowired
			private UserRepository urepository;
			
				
			public static void main(String[] args) {
				SpringApplication.run(SbCarBackend.class, args);
			}
		
			@Override
			public void run(String... args) throws Exception {
				// Add owner objects and save these to db 
				Owner owner1 = new Owner("John" , "Johnson");
				Owner owner2 = new  Owner("Mary" , "Robinson");
				orepository.saveAll(Arrays.asList(owner1, owner2));
		
				// Add car object and link to owners and save these to db
				Car car1 = new Car("Ford", "Mustang", "Red", 
						"ADF-1121", 2021, 59000);
				Car car2 = new Car("Nissan", "Leaf", "White", 
						"SSJ-3002", 2019, 29000);
				Car car3 = new Car("Toyota", "Prius", "Silver", 
						"KKO-0212", 2020, 39000);
				repository.saveAll(Arrays.asList(car1, car2, car3));
				
						  
				for (Car car : repository.findAll()) {
					logger.info(car.getBrand() + " " + car.getModel());
				}
				
				urepository.save(new User("user", 
						"$2a$10$NVM0n8ElaRgg7zWO1CxUdei7vWoPg91Lz2aYavh9.f9q0e4bRadue","USER"));
				urepository.save(new User("admin", 
						"$2a$10$8cjz47bjbR4Mn8GMg9IZx.vyjhLXR/SKKMSZ9.mP9vpMu0ssKi8GW", "ADMIN"));
			}
}


