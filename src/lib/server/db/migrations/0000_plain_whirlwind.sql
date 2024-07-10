CREATE TABLE `participants` (
	`id` integer PRIMARY KEY NOT NULL,
	`bsc_address` text,
	`xian_address` text,
	`signature` text,
	`amount_to_receive` real,
	`agreed_to_terms` text
);
