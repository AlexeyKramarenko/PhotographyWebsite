using ApplicationCore.DomainModel;
using AutoMapper;
using Microsoft.AspNet.Identity.EntityFramework;
using Photographer.Models.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Photographer.App_Start
{
    public class AutoMapperConfig
    {
        public static void RegisterMappings()
        {

            Mapper.CreateMap<NewGalleryPictureViewModel, Picture>();

            Mapper.CreateMap<Picture, PictureViewModel>();
              
            Mapper.CreateMap<Picture, PictureItemViewModel>()
                .ForMember("PictureID", opt => opt.MapFrom(a => a.PictureID))
                .ForMember("GalleryID", opt => opt.MapFrom(a => a.GalleryID))
                .ForMember("LargeImagePath", opt => opt.MapFrom(a => a.LargeImagePath))
                .ForMember("ThumbnailImagePath", opt => opt.MapFrom(a => a.ThumbnailImagePath))
                .ForMember("Checked", opt => opt.MapFrom(a => a.IsOrdered));
                      

            Mapper.CreateMap<Gallery, UserItemViewModel>();

        }


    }
}
