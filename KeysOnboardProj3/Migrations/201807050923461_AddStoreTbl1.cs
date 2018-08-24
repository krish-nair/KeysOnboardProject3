namespace KeysOnboardProj3.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddStoreTbl1 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Stores", "Address", c => c.String(nullable: false));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Stores", "Address", c => c.String());
        }
    }
}
