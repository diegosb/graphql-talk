using GraphQL.Types;
using Moderation.Domain.Contracts.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Moderation.Domain.GraphQL
{
   public class ModerationQuery : ObjectGraphType
   {
    public ModerationQuery(IModerationRepository moderationRepository)
    {
        Field<ModerationType>(
            "moderation",
            arguments: new QueryArguments(new QueryArgument<IntGraphType> { Name = "id" }),
            resolve: context => moderationRepository.Find(p => p.Id == context.GetArgument<int>("id", 0)));

        Field<ModerationType>(
            "randomModeration",
            resolve: context => moderationRepository.Find(p => p.Id == 500));

        Field<ListGraphType<ModerationType>>(
            "moderations",
            resolve: context => moderationRepository.GetAll());
       }
   }
}