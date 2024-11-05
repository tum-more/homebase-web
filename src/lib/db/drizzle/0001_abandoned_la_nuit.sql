CREATE TABLE `bcorp_raw_data_table` (
	`id` int AUTO_INCREMENT NOT NULL,
	`company_name` varchar(255),
	`industry` varchar(255),
	`location` varchar(255),
	`website` varchar(255),
	`date_of_certification` varchar(255),
	`company_description` text,
	`created_at` timestamp DEFAULT CURRENT_TIMESTAMP,
    `updated_at` timestamp DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `bcorp_raw_data_table_id` PRIMARY KEY(`id`)
);
