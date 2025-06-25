using System;
using Little_Choice_Based_RPG;

namespace LCB_RPG_ASP.NET
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            //Add builder services
            builder.Services.AddSignalR();

            //Use builder services to generate the uh, page I guess?
            var app = builder.Build(); //This has to go AFTER builder.Services is modified!

            // enables wwwroot/*
            app.UseDefaultFiles();
            app.UseStaticFiles();    

            //Set the root homepage
            app.MapGet("/", () => Results.File("views/LCB-Client.html", "text/html"));

            //Run :)
            app.Run();
        }   
    }
}