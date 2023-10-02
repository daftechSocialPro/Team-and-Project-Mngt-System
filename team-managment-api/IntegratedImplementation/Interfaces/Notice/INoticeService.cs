using Implementation.Helper;
using IntegratedImplementation.DTOS.Notice;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace IntegratedImplementation.Interfaces.Notice
{
    public interface INoticeService
    {
        Task<ResponseMessage> PostNotice(NoticePostDto sendNotice);
        Task<List<NoticeGetDto>> GetNotices();
        Task<NoticeGetDto> GetNotice(Guid id);
    }
}
