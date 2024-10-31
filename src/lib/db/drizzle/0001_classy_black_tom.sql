CREATE TABLE `greenseal_raw_data_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`company_name` varchar(255),
	`industry` varchar(255),
	`location` varchar(255),
	`website` varchar(255),
	`certification_type` varchar(100),
	`date_of_certification` date,
	`validity` date,
	`score` double,
	`carbon_footprint` varchar(255),
	`product_service_name` varchar(255),
	`product_service_description` text,
	`environment_description` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp,
	CONSTRAINT `greenseal_raw_data_table_id` PRIMARY KEY(`id`)
);
