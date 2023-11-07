using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace IntegratedImplementation.Helper
{
    public static class ExtenstionMethods
    {
        
            private static IContainer Cell(this IContainer container, bool dark)
            {
                return container
                    .Border(1)
                    .Background(dark ? Colors.Blue.Lighten3 : Colors.White)
                    .Padding(10);
            }

            // displays only text label
            public static void LabelCell(this IContainer container, string text) => container.Cell(true).Text(text).Medium();

            // allows you to inject any type of content, e.g. image
            public static IContainer ValueCell(this IContainer container) => container.Cell(false);

        

    }
    public static class Typography
    {
        public static TextStyle Title => TextStyle.Default.FontFamily(Fonts.Lato).FontColor(Colors.Blue.Darken3).FontSize(26).Black();
        public static TextStyle Headline => TextStyle.Default.FontFamily(Fonts.Lato).FontColor(Colors.Blue.Medium).FontSize(16).SemiBold();
        public static TextStyle Normal => TextStyle.Default.FontFamily(Fonts.Lato).FontColor(Colors.Black).FontSize(10).LineHeight(1.2f);
    }
    public class ImagePlaceholder : IComponent
    {
        public static bool Solid { get; set; } = false;

        public void Compose(IContainer container)
        {
            if (Solid)
                container.Background(Placeholders.Color());

            else
                container.Image(Placeholders.Image);
        }
    }

    
}
