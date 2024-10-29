CREATE TABLE `carbon_thai` (
	`id` int AUTO_INCREMENT NOT NULL,
	`certificate_number` text,
	`product_name` text,
	`manufacturer` text,
	`contact_person` text,
	`address` text,
	`phone` text,
	`email` text,
	`industry` text,
	`unit_of_work` text,
	`scope` text,
	`carbon_footprint` text,
	`approval_date` text,
	`expiry_date` text,
	`product_image` text,
	CONSTRAINT `carbon_thai_id` PRIMARY KEY(`id`)
);
