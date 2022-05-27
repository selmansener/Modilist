using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using FluentValidation;

using Mapster;

using MediatR;

using Modilist.Business.CQRS.StylePreferencesDomain.DTOs;
using Modilist.Data.Repositories.StylePreferencesDomain;
using Modilist.Domains.StylePreferences.Models;

using Newtonsoft.Json;

namespace Modilist.Business.CQRS.StylePreferencesDomain.Commands
{
    public class CreateStylePreferences : IRequest<StylePreferencesDTO>
    {
        [JsonIgnore]
        public Guid AccountId { get; set; }
    }

    internal class CreateStylePreferencesValidator : AbstractValidator<CreateStylePreferences>
    {
        public CreateStylePreferencesValidator()
        {
            RuleFor(x => x.AccountId).NotEmpty();
        }
    }

    internal class CreateStylePreferencesHandler : IRequestHandler<CreateStylePreferences, StylePreferencesDTO>
    {
        private readonly IStylePreferencesWriteRepository _stylePreferencesWriteRepository;

        public CreateStylePreferencesHandler(IStylePreferencesWriteRepository stylePreferencesWriteRepository)
        {
            _stylePreferencesWriteRepository = stylePreferencesWriteRepository;
        }

        public async Task<StylePreferencesDTO> Handle(CreateStylePreferences request, CancellationToken cancellationToken)
        {
            var stylePreference = await _stylePreferencesWriteRepository.GetByAccountIdAsync(request.AccountId, cancellationToken);

            if (stylePreference != null)
            {
                // TODO: change exception type
                throw new Exception("StylePreferences already created for account");
            }

            stylePreference = new StylePreference(request.AccountId);

            await _stylePreferencesWriteRepository.AddAsync(stylePreference, cancellationToken, true);

            return stylePreference.Adapt<StylePreferencesDTO>();
        }
    }
}
