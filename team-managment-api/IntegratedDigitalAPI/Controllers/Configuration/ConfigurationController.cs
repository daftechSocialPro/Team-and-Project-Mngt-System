using Implementation.Helper;
using IntegratedImplementation.DTOS.Project;
using IntegratedImplementation.Interfaces.Configuration;
using IntegratedImplementation.Interfaces.Project;
using IntegratedInfrustructure.Migrations;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Web;
using System.IO;
using Microsoft.AspNetCore.StaticFiles;

namespace IntegratedDigitalAPI.Controllers.Configuration
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConfigurationController : ControllerBase
    {
        IGeneralConfigService _generalConfigService;
        public ConfigurationController(IGeneralConfigService generalConfigService)
        {

            _generalConfigService = generalConfigService;
        }
        [HttpPost]
        [ProducesResponseType(typeof(ResponseMessage), (int)HttpStatusCode.OK)]
        public async Task<IActionResult> AddProject(IFormFile file, string name, string path)
        {
            if (ModelState.IsValid)
            {
                return Ok(await _generalConfigService.UploadFiles(file, name, path));
            }
            else
            {
                return BadRequest();
            }
        }
        [HttpGet("pdf")]
        public async Task<IActionResult> GetFile(string path)
        {

            var fullpath = Path.Combine(Directory.GetCurrentDirectory(), path);
            var contentTypeProvider = new FileExtensionContentTypeProvider();

            // Determine the MIME type based on the file extension
            if (!contentTypeProvider.TryGetContentType(fullpath, out var mimeType))
            {
                mimeType = "application/octet-stream"; // Default to 'application/octet-stream' if the MIME type is not found
            }

            // Read the file as bytes
            var bytes = await System.IO.File.ReadAllBytesAsync(fullpath);

        
            return File(bytes, mimeType);

        }



        [HttpGet("weeklyreports")]
        public IActionResult GetFolderContents([FromServices] IWebHostEnvironment env)
        {
            var directoryPath = Path.Combine(env.WebRootPath, "WeeklyReport");
            if (!Directory.Exists(directoryPath))
            {
                return NotFound();
            }

            var fileInfos = Directory.EnumerateFiles(directoryPath).Select(filePath => new FileInfo(filePath));
            var fileDetails = fileInfos.Select(fileInfo => new
            {
                Name = fileInfo.Name,
                Path = fileInfo.FullName.Replace(env.ContentRootPath, "").TrimStart('\\')
            });
            return Ok(fileDetails);
        }
    }
}
