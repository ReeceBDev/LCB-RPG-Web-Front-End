using System;

namespace LCB_RPG_ASP.NET
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var app = builder.Build();

            app.UseStaticFiles();    // enables wwwroot/*

            app.MapGet("/", () => Results.File("views/LCB-Client.html", "text/html"));

            app.Run();
        }   
    }
}