CREATE TABLE `bcorp_raw_data_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`company_name` varchar(255),
	`industry` varchar(255),
	`location` varchar(255),
	`website` varchar(255),
	`certified_since` varchar(255),
	`reference_url` varchar(255),
	`company_description` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp,
	CONSTRAINT `bcorp_raw_data_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `company_data_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`company_name` varchar(255),
	`industry` varchar(255),
	`location` varchar(255),
	`website` varchar(255),
	`related_companies` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp,
	CONSTRAINT `company_data_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `greenseal_raw_data_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`company_name` varchar(255),
	`industry` varchar(255),
	`location` varchar(255),
	`website` varchar(255),
	`certification_type` text,
	`date_of_certification` date,
	`year_of_certification` varchar(4),
	`validity` date,
	`validity_year` varchar(4),
	`score` double,
	`carbon_footprint` varchar(255),
	`product_service_name` varchar(255),
	`product_service_description` text,
	`environment_description` text,
	`reference_url` text,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp,
	CONSTRAINT `greenseal_raw_data_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tgo_raw_data_table` (
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
	`product_image_url` varchar(255),
	`company_id` int,
	`created_at` timestamp DEFAULT (now()),
	`updated_at` timestamp,
	CONSTRAINT `tgo_raw_data_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `product_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`certification_type` varchar(100),
	`date_of_certification` date,
	`validity` date,
	`score` double,
	`carbon_footprint` varchar(255),
	`product_service_name` varchar(255),
	`product_service_description` text,
	`environment_description` text,
	`product_image_url` varchar(255),
	`company_id` int NOT NULL,
	CONSTRAINT `product_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `product_table` ADD CONSTRAINT `product_table_company_id_company_data_table_id_fk` FOREIGN KEY (`company_id`) REFERENCES `company_data_table`(`id`) ON DELETE no action ON UPDATE no action;