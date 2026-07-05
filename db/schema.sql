IF DB_ID(N'personalized_trip_planner') IS NULL
BEGIN
    CREATE DATABASE personalized_trip_planner;
END
GO

USE personalized_trip_planner;
GO

SET ANSI_NULLS ON;
GO

SET QUOTED_IDENTIFIER ON;
GO

/* =====================================================
   1. USERS
   ===================================================== */

CREATE TABLE [dbo].[users](
    [user_id] [int] IDENTITY(1,1) NOT NULL,
    [first_name] [nvarchar](100) NOT NULL,
    [last_name] [nvarchar](100) NOT NULL,
    [email] [nvarchar](255) NOT NULL,
    [password] [nvarchar](255) NOT NULL,
    [created_at] [datetime2](7) NOT NULL,

    CONSTRAINT [PK_users]
        PRIMARY KEY CLUSTERED ([user_id] ASC),

    CONSTRAINT [UQ_users_email]
        UNIQUE ([email]),

    CONSTRAINT [CK_users_email_format]
        CHECK ([email] LIKE N'%_@_%._%'),

    CONSTRAINT [CK_users_password_length]
        CHECK (LEN([password]) >= 6)
);
GO

ALTER TABLE [dbo].[users]
ADD CONSTRAINT [DF_users_created_at]
DEFAULT (SYSDATETIME()) FOR [created_at];
GO

/* =====================================================
   2. TRIPS
   ===================================================== */

CREATE TABLE [dbo].[trips](
    [trip_id] [int] IDENTITY(1,1) NOT NULL,
    [slug] [nvarchar](120) NOT NULL,
    [title] [nvarchar](150) NOT NULL,
    [city] [nvarchar](100) NOT NULL,
    [country] [nvarchar](100) NOT NULL,
    [trip_type] [nvarchar](50) NOT NULL,
    [estimated_price] [decimal](10,2) NOT NULL,
    [duration_days] [int] NOT NULL,
    [recommended_group_size] [int] NOT NULL,
    [kosher_friendly] [bit] NOT NULL,
    [short_description] [nvarchar](max) NOT NULL,
    [image_path] [nvarchar](255) NOT NULL,
    [created_at] [datetime2](7) NOT NULL,

    CONSTRAINT [PK_trips]
        PRIMARY KEY CLUSTERED ([trip_id] ASC),

    CONSTRAINT [UQ_trips_slug]
        UNIQUE ([slug]),

    CONSTRAINT [CK_trips_duration_days]
        CHECK ([duration_days] > 0),

    CONSTRAINT [CK_trips_estimated_price]
        CHECK ([estimated_price] >= 0),

    CONSTRAINT [CK_trips_recommended_group_size]
        CHECK ([recommended_group_size] > 0),

    CONSTRAINT [CK_trips_trip_type]
        CHECK (
            [trip_type] = N'Urban'
            OR [trip_type] = N'Adventure'
            OR [trip_type] = N'Family'
            OR [trip_type] = N'Romantic'
        )
);
GO

ALTER TABLE [dbo].[trips]
ADD CONSTRAINT [DF_trips_created_at]
DEFAULT (SYSDATETIME()) FOR [created_at];
GO

/* =====================================================
   3. INTERESTS
   ===================================================== */

CREATE TABLE [dbo].[interests](
    [interest_id] [int] IDENTITY(1,1) NOT NULL,
    [name] [nvarchar](100) NOT NULL,

    CONSTRAINT [PK_interests]
        PRIMARY KEY CLUSTERED ([interest_id] ASC),

    CONSTRAINT [UQ_interests_name]
        UNIQUE ([name])
);
GO

/* =====================================================
   4. ITINERARY DAYS
   ===================================================== */

CREATE TABLE [dbo].[itinerary_days](
    [day_id] [int] IDENTITY(1,1) NOT NULL,
    [trip_id] [int] NOT NULL,
    [day_number] [int] NOT NULL,
    [title] [nvarchar](150) NOT NULL,
    [description] [nvarchar](max) NOT NULL,

    CONSTRAINT [PK_itinerary_days]
        PRIMARY KEY CLUSTERED ([day_id] ASC),

    CONSTRAINT [UQ_itinerary_days_trip_day]
        UNIQUE ([trip_id], [day_number]),

    CONSTRAINT [CK_itinerary_days_day_number]
        CHECK ([day_number] > 0),

    CONSTRAINT [FK_itinerary_days_trips]
        FOREIGN KEY ([trip_id])
        REFERENCES [dbo].[trips] ([trip_id])
        ON DELETE CASCADE
);
GO

/* =====================================================
   5. TRIP INTERESTS
   ===================================================== */

CREATE TABLE [dbo].[trip_interests](
    [trip_id] [int] NOT NULL,
    [interest_id] [int] NOT NULL,

    CONSTRAINT [PK_trip_interests]
        PRIMARY KEY CLUSTERED (
            [trip_id] ASC,
            [interest_id] ASC
        ),

    CONSTRAINT [FK_trip_interests_trips]
        FOREIGN KEY ([trip_id])
        REFERENCES [dbo].[trips] ([trip_id])
        ON DELETE CASCADE,

    CONSTRAINT [FK_trip_interests_interests]
        FOREIGN KEY ([interest_id])
        REFERENCES [dbo].[interests] ([interest_id])
        ON DELETE CASCADE
);
GO

/* =====================================================
   6. SAVED TRIPS
   ===================================================== */

CREATE TABLE [dbo].[saved_trips](
    [saved_id] [int] IDENTITY(1,1) NOT NULL,
    [user_id] [int] NOT NULL,
    [trip_id] [int] NOT NULL,
    [status] [nvarchar](20) NOT NULL,
    [saved_at] [datetime2](7) NOT NULL,

    CONSTRAINT [PK_saved_trips]
        PRIMARY KEY CLUSTERED ([saved_id] ASC),

    CONSTRAINT [UQ_saved_trips_user_trip]
        UNIQUE ([user_id], [trip_id]),

    CONSTRAINT [CK_saved_trips_status]
        CHECK (
            [status] = N'planned'
            OR [status] = N'favorite'
            OR [status] = N'visited'
        ),

    CONSTRAINT [FK_saved_trips_users]
        FOREIGN KEY ([user_id])
        REFERENCES [dbo].[users] ([user_id])
        ON DELETE CASCADE,

    CONSTRAINT [FK_saved_trips_trips]
        FOREIGN KEY ([trip_id])
        REFERENCES [dbo].[trips] ([trip_id])
        ON DELETE CASCADE
);
GO

ALTER TABLE [dbo].[saved_trips]
ADD CONSTRAINT [DF_saved_trips_status]
DEFAULT (N'planned') FOR [status];
GO

ALTER TABLE [dbo].[saved_trips]
ADD CONSTRAINT [DF_saved_trips_saved_at]
DEFAULT (SYSDATETIME()) FOR [saved_at];
GO

/* =====================================================
   7. REVIEWS
   ===================================================== */

CREATE TABLE [dbo].[reviews](
    [review_id] [int] IDENTITY(1,1) NOT NULL,
    [user_id] [int] NOT NULL,
    [trip_id] [int] NOT NULL,
    [rating] [int] NOT NULL,
    [comment] [nvarchar](max) NOT NULL,
    [created_at] [datetime2](7) NOT NULL,

    CONSTRAINT [PK_reviews]
        PRIMARY KEY CLUSTERED ([review_id] ASC),

    CONSTRAINT [UQ_reviews_user_trip]
        UNIQUE ([user_id], [trip_id]),

    CONSTRAINT [CK_reviews_comment_not_empty]
        CHECK (LEN(LTRIM(RTRIM([comment]))) > 0),

    CONSTRAINT [CK_reviews_rating]
        CHECK ([rating] >= 1 AND [rating] <= 5),

    CONSTRAINT [FK_reviews_users]
        FOREIGN KEY ([user_id])
        REFERENCES [dbo].[users] ([user_id])
        ON DELETE CASCADE,

    CONSTRAINT [FK_reviews_trips]
        FOREIGN KEY ([trip_id])
        REFERENCES [dbo].[trips] ([trip_id])
        ON DELETE CASCADE
);
GO

ALTER TABLE [dbo].[reviews]
ADD CONSTRAINT [DF_reviews_created_at]
DEFAULT (SYSDATETIME()) FOR [created_at];
GO